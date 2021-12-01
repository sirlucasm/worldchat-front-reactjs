import Toast from "./Toast";

export default function Signup({
  sets,
  setCurrentPage,
  signUp,
  error
}) {
  return (
    <div className="bg-gray-100 w-56 signup-form">
      <form className="bg-white shadow-xl rounded px-8 pt-6 pb-8" onSubmit={signUp}>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuário
            </label>
            <input
              onChange={(e) => sets.setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" name="username" type="text" placeholder="Usuário" required />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => sets.setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" name="email" type="email" placeholder="E-mail" required />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              onChange={(e) => sets.setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password" name="password" type="password" placeholder="********" required />
        </div>
        <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Cadastrar
            </button>
            <a onClick={() => setCurrentPage('login')} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Entrar
            </a>
        </div>
      </form>
      <Toast
        error={error}
      />
    </div>
  );
}
