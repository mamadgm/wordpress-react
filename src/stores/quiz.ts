// src/stores/quiz.ts
import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    first_name: "",
    last_name: "",
    phone_number: "",
    answers: {} as { [key: number]: string },
    result_card: "",
    final_card: "", // 👈 NEW
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
    setResultCard(card: string) {
      this.result_card = card;
    },
    questions: [] as any[], // instead of static list

    setQuestions(qs: any[]) {
      this.questions = qs;
    },
  },
});
