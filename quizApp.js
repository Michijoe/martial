function quizApp() {
  return {
    welcome: true,
    step: 1,
    showResult: false,
    recommendedSports: [],
    questions: [],
    scores: {},
    selectedValues: {},
    fetchData() {
      fetch('./data/data.json')
        .then(response => response.json())
        .then(data => this.questions = data.questions)
        .catch(error => console.error('Error:', error));
    },
    nextStep() {
      if (this.step < this.questions.length) {
        this.step++;
      }
    },
    updateScores(index) {
      Object.keys(this.selectedValues[index]).forEach(sport => {
        if (!this.scores[sport]) {
          this.scores[sport] = 0;
        }
        this.scores[sport] += this.selectedValues[index][sport];
      });
      this.nextStep();
    },
    calculateWinner() {
      const maxScore = Math.max(...Object.values(this.scores));
      this.recommendedSports = Object.keys(this.scores).filter(sport => this.scores[sport] === maxScore);

      this.showResult = true;
    }
  }
}