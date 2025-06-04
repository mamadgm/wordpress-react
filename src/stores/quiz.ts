// src/stores/quiz.ts
import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    first_name: "",
    last_name: "",
    phone_number: "",
    answers: {} as { [key: number]: string },
    final_card: "",
    resultOptions: [] as string[],
    summary: [] as any[],
  }),
  actions: {
    setUserInfo(first: string, last: string, phone: string) {
      this.first_name = first;
      this.last_name = last;
      this.phone_number = phone;
    },
    setAnswer(id: number, answer: string) {
      this.answers[id] = answer;
    },
    questions: [] as any[], // instead of static list

    setQuestions(qs: any[]) {
      this.questions = qs;
    },
    setResultCard(role: string) {
      this.final_card = role;
    },
  },
});
