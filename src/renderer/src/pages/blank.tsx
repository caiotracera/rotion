import { Link } from 'react-router-dom';

export function Blank() {
  return (
    <main className="flex-1 flex items-center justify-center text-rotion-400">
      Selecione ou crie um documento
      <Link to="/document" className="ml-4 text-rotion-300">
        Acessar document
      </Link>
    </main>
  );
}
