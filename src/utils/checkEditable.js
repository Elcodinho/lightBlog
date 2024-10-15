import { differenceInHours, parse } from "date-fns";
import { ru } from "date-fns/locale";
// Функция проверяет возиожность редактирования
export function checkIfEditable(commentTime, timeLimit) {
  const commentDate = parse(commentTime, "d MMMM yyyy, HH:mm", new Date(), {
    locale: ru,
  });
  const hoursPassed = differenceInHours(new Date(), commentDate);
  return hoursPassed < timeLimit; // true, если прошло меньше 2 часов
}
