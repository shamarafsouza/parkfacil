# ParkFácil — publicação com chat de IA

Esta pasta está pronta para publicar na Vercel. O site fica em `public/` e a função segura que chama a Anthropic fica em `api/chat.js`.

## Publicar

1. Crie um novo repositório no GitHub e envie **todo o conteúdo desta pasta**.
2. Entre em https://vercel.com/new, importe o repositório e clique em **Deploy**.
3. No projeto da Vercel, abra **Settings → Environment Variables** e crie:
   - `ANTHROPIC_API_KEY`: sua chave secreta da Anthropic.
   - `ANTHROPIC_MODEL` (opcional): o identificador do modelo disponível na sua conta Anthropic. Se não adicionar, o projeto usa `claude-sonnet-4-20250514`.
4. Depois de salvar as variáveis, abra **Deployments**, selecione o último deployment e use **Redeploy**.

Nunca coloque a chave no `index.html`, em commits ou no GitHub. Ela deve existir somente nas variáveis de ambiente da Vercel.
