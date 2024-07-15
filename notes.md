### configs no vscode

Confis no vscode para escrever tags via emmet (sugerir <p></p> apenas escrevendo p etc)

```json
"emmet.includeLanguages": {
  "javascript": "javascriptreact"
},
"emmet.syntaxProfiles": {
  "javascript": "jsx"
},
```

** nunca foi preciso isso, ou outra forma de config foi feita

### extensões

Name: Tailwind CSS IntelliSense
Id: bradlc.vscode-tailwindcss
Description: Intelligent Tailwind CSS tooling for VS Code
Version: 0.12.5
Publisher: Tailwind Labs
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

Name: PostCSS Language Support
Id: csstools.postcss
Description: Syntax highlighting for modern and experimental CSS in VSCode
Version: 1.0.9
Publisher: csstools
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=csstools.postcss

## tailwindconfig


```js
// set fontFamily para app e um boxShadow customizado: shape
// shadow-shape pode ser chamado agora em um className, assim como bg-pattern
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter',
      },
      boxShadow: {
        shape: 'box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)'
      },
      backgroundImage: {
        pattern: 'url(/bg.png)'
      }
    },
  },
  plugins: [],
}
```


## React Router

```ts
// navegação de componente, igual ao angular
const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
]);
```

```ts
// react router tem um hook que faz as navegações
// ao validar função, basta utiliza-lo e passar a rota
const navigate = useNavigate();

function createTrip() {
  navigate('trips/123')
}
```


## children ReactNode

Passar conteúdo reutilizáveis e encapsular partes do código em componentes
Forma reutilizar conteúdo dentro de outros componentes

```tsx
interface ButtonProps {
  // ReactNode é qualquer coisa que poderia ser escrita no html
  children: ReactNode; 
}
```

- passar funções

```tsx
/*
  Forma trabalhosa, já que sempre que algum btn precisar de 
  nova funcionalidade de botões, será necessária add na interface.
*/
interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export function Button({
  children,
  onClick
}: ButtonProps) {
  return (
    <button 
    onClick={onClick}
      className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'
    >
      { children }
    </button>
  );
}
```

> Para resolver isso, basta herdar uma classe do react: ComponentProps

```tsx
// dessa forma, esta props recebe todas as funcionalidades presentes em um botão html
interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
}

/*
  para não passar todas as props na mão, se pode utilizar rest operator.
  depois basta passar como spread operator dentro da tag
*/ 

export function Button({
  children,
  ...props 
}: ButtonProps) {
  return (
    <button 
      {...props}
      className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'
    >
      { children }
    </button>
  );
}

```

### dicas

```tsx
/* formas deixas items alinhados de forma não auto com um justify-between */
<div className="space-y-2.5">
  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex gap-3">
    <CircleCheck className="size-5 text-lime-300"/>
    <span className="text-zinc-100">Academia em grupo</span>
    <span className="text-sm text-zinc-400 ml-auto">8:00h</span>
  </div>
</div>

<div className="space-y-2.5">
  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
    <CircleCheck className="size-5 text-lime-300"/>
    <span className="text-zinc-100">Academia em grupo</span>
    <span className="text-sm text-zinc-400 ml-auto">8:00h</span>
  </div>
</div>
```


```tsx
/* 
  o link 2 vai diminuir de tamanho. 
  Os elementos que tem flex [!1] não declaram quem pode aumentar (grow) ou diminuir (shrink).
  Dessa forma o css não sabem o que fazer
*/
<div className="flex items-center justify-between gap-4"> /* !1 */
  <div className="space-y-1.5">
    <span className="block font-medium text-zinc-100">Título Link</span>
    <span className="block font-xs text-zinc-400 truncate">
      https://lerolero.bgnweb.com.br/121231545456d4adsadadjhjkdsa45454d5s4d5a
    </span>                  
  </div>
  <Link2 className='text-zinc-400 size-5' />
</div>

/* com flex-1, permite que os tamanho dos elementos possam se adaptar */

<div className="space-y-5">
  <div className="flex items-center justify-between gap-4">
    <div className="space-y-1.5 flex-1">
      <span className="block font-medium text-zinc-100">Título Link</span>
      <span className="block font-xs text-zinc-400 truncate"> /* !2 */
        https://lerolero.bgnweb.com.br/121231545456d4adsadadjhjkdsa45454d5s4d5a
      </span>                  
    </div>
    <Link2 className='text-zinc-400 size-5' />
  </div>
</div>

/* ou declarar quem pode ou não aumentar/diminuir  shrink-0 (flex-shrink: 0;) neste caso*/

<div className="space-y-5">
  <div className="flex items-center justify-between gap-4">
    <div className="space-y-1.5">
      <span className="block font-medium text-zinc-100">Título Link</span>
      <span className="block font-xs text-zinc-400 truncate">
        https://lerolero.bgnweb.com.br/121231545456d4adsadadjhjkdsa45454d5s4d5a
      </span>                  
    </div>
    <Link2 className='text-zinc-400 size-5 shrink-0' />
  </div>
</div>
```

```css
// para esconder um tempo muito longo [!2]
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```


```tsx
/* [color-scheme:dark] isso é passar um css literal no tailwind */
<input 
  type="datetime-local"
  name='occurs_at'
  placeholder="Data e horário da atividade"
  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 [color-scheme:dark]"
/>
```