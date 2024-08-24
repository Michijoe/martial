function quizApp() {
  return {
    welcome: true,
    step: 1,
    answers: Array(10).fill(null),
    showResult: false,
    recommendedSports: [],
    questions: [],
    fetchData() {
      fetch('data.json')
        .then(response => response.json())
        .then(data => this.questions = data.questions);
    },
    nextStep() {
      if (this.step < this.questions.length) {
        this.step++;
      }
    },
    calculateScores() {
      const scores = {
        aikido: 0,
        muayThai: 0,
        kendo: 0,
        jiuJitsu: 0,
        kravMaga: 0,
        karate: 0,
        boxing: 0,
        taiChi: 0
      };

      this.answers.forEach(answer => {
        for (const [key, value] of Object.entries(answer)) {
          scores[key] += value;
        }
      });

      const maxScore = Math.max(...Object.values(scores));
      this.recommendedSports = Object.keys(scores).filter(sport => scores[sport] === maxScore);

      this.showResult = true;
    }
  }
}