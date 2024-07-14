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