import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { COMMENTS_URL } from "@constants/constants";

// Функция получения комментариев
export const getComments = createAsyncThunk(
  "comments/getComments",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(`${COMMENTS_URL}?postId=${id}`);
      if (!response.ok)
        throw new Error("Ошибка: Не удалось получить комментарии");
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.message === "Failed to fetch") {
        error.message = "Ошибка! Не удалось выполнить запрос";
      }
      return rejectWithValue(error.message);
    }
  }
);

// Функци добавления комментариев
export const addComment = createAsyncThunk(
  "comments/addComment",
  async function ({ id, time, author, text }, { rejectWithValue }) {
    try {
      const comment = {
        postId: id,
        time,
        author,
        text,
      };
      const response = await fetch(COMMENTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (!response.ok)
        throw new Error("Ошибка: Не удалось добавить комментарий");
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.message === "Failed to fetch") {
        error.message = "Ошибка! Не удалось выполнить запрос";
      }
      return rejectWithValue(error.message);
    }
  }
);

// Функци удаления комментариев
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(`${COMMENTS_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error("Ошибка: Не удалось удалить комментарий");
      return id;
    } catch (error) {
      if (error.message === "Failed to fetch") {
        error.message = "Ошибка! Не удалось выполнить запрос";
      }
      return rejectWithValue(error.message);
    }
  }
);

// Функция для редактирования комменатрия
export const editComment = createAsyncThunk(
  "comments/editComment",
  async function ({ id, text }, { rejectWithValue }) {
    const post = {
      text,
    };
    try {
      const response = await fetch(`${COMMENTS_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (!response.ok)
        throw new Error("Ошибка: Не удалось отредактировать комментарий");
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.message === "Failed to fetch") {
        error.message = "Ошибка! Не удалось выполнить запрос";
      }
      return rejectWithValue(error.message);
    }
  }
);

// Общая функция для обработки pending
const handlePending = (state) => {
  state.status = "loading";
  state.error = null;
};

// Универсальная функция обработки ошибок
const handleRejected = (builder, asyncThunk) => {
  builder.addCase(asyncThunk.rejected, (state, action) => {
    state.status = "rejected";
    state.error = action.payload || action.error.message;
  });
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {},
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, handlePending)
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = "resolved";
        state.comments = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload); // Добавляем новый комментарий в массив comments
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "resolved";
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      }) // Обновляем массив комментариев сразу после удаления
      .addCase(editComment.fulfilled, (state, action) => {
        state.status = "resolved";
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );

        if (index !== -1) {
          // Обновляем комментарий в массиве
          state.comments[index] = {
            ...state.comments[index], // Сохраняем существующие данные (например, author)
            text: action.payload.text,
          };
        }
      });

    handleRejected(builder, getComments);
    handleRejected(builder, addComment);
    handleRejected(builder, deleteComment);
    handleRejected(builder, editComment);
  },
});

export const selectComments = (state) => state.comments.comments;
export default commentsSlice.reducer;
