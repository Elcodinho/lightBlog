import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@constants/constants";

// Функция получения постов
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(API_URL);
      if (!response.ok)
        throw new Error("Ошибка: Не удалось получить список постов");
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

// Функция добавления постов
export const addPost = createAsyncThunk(
  "posts/addPost",
  async function ({ title, text, time, author }, { rejectWithValue }) {
    try {
      const post = {
        id: Date.now().toString(),
        title: title,
        datetime: time,
        body: text,
        author: author,
        isEdit: false,
      };
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error("Ошибка: Не удалось добавить пост");
    } catch (error) {
      if (error.message === "Failed to fetch") {
        error.message = "Ошибка! Не удалось выполнить запрос";
      }
      return rejectWithValue(error.message);
    }
  }
);

// Функция удаления постов
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async function ({ id }, { rejectWithValue }) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Ошибка: Не удалось удалить пост");
    } catch (error) {
      if (error.message === "Failed to fetch") {
        error.message = "Ошибка! Не удалось выполнить запрос";
      }
      return rejectWithValue(error.message);
    }
  }
);

// Функция для редактирования постов
export const editPost = createAsyncThunk(
  "posts/editPost",
  async function ({ id, title, text, time, author }, { rejectWithValue }) {
    const post = {
      id: id,
      title: title,
      datetime: time,
      body: text,
      author,
      isEdit: true,
    };
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (!response.ok)
        throw new Error("Ошибка: Не удалось отредактировать пост");
    } catch (error) {
      if (error.message === "Failed to fetch") {
        error.message = "Ошибка! Не удалось выполнить запрос";
      }
      return rejectWithValue(error.message);
    }
  }
);

// Универсальная функция обработки ошибок
const handleRejected = (builder, asyncThunk) => {
  builder.addCase(asyncThunk.rejected, (state, action) => {
    state.status = "rejected";
    state.error = action.payload || action.error.message;
  });
};

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: null,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "resolved";
        state.posts = action.payload;
      });
    handleRejected(builder, getPosts); // обработка ошибок для getPosts
    handleRejected(builder, addPost);
    handleRejected(builder, deletePost); // обработка ошибок для addPost
    handleRejected(builder, editPost); // обработка ошибок для editPost
  },
});

export const selectPosts = (state) => state.posts.posts;
export default postsSlice.reducer;
