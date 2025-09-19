import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/learn(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Ignora rotas do Clerk
    '/((?!_next|sign-in|sign-up|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};






/*// middleware.ts - Versão Final

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// 1. Defina as rotas que você quer proteger
const isProtectedRoute = createRouteMatcher([
  '/learn(.*)',
]);

// 2. Crie o middleware
export default clerkMiddleware(async (auth, req) => {
  // Pega o ID do usuário da sessão. Se não houver usuário, será null.
  const { userId } = await auth();

  // 3. Verifica se a rota é protegida E se o usuário NÃO está logado
  if (isProtectedRoute(req) && !userId) {
    // 4. Se as duas condições forem verdadeiras, redireciona para a página de login

    // Cria a URL da página de login
    const signInUrl = new URL('/sign-in', req.url);

    // Adiciona um parâmetro para que o Clerk saiba para onde voltar após o login
    signInUrl.searchParams.set('redirect_url', req.url);

    // Retorna a resposta de redirecionamento
    return NextResponse.redirect(signInUrl);
  }

  // 5. Se a rota não for protegida ou se o usuário estiver logado, continua normalmente
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};*/