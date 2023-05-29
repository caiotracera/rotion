import { ToC } from '../components/ToC';

export function Document() {
  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold uppercase text-xs">
          TABLE OF CONTENTS
        </span>

        <ToC.Root>
          <ToC.Link>Arquitetura Back-end</ToC.Link>
          <ToC.Section>Banco de Dados</ToC.Section>
          <ToC.Section>Autenticação</ToC.Section>
          <ToC.Section>Mensageria</ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center"></section>
    </main>
  );
}
