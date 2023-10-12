class ParamsError extends Error {
  constructor(params) {
    super(`O(s) parâmetro(s) ${params.join(", ")} está(ão) incorreto(s)`)
    this.name = 'ParamsError';
  }
}

module.exports = ParamsError