import { cookies } from 'next/headers';
type Token = string | null;


const getServerToken = (): Token => {
  const sessionToken = cookies().get(
    process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token'
  );
  const token = sessionToken ? sessionToken.value : null;
  return token;
};

export default getServerToken
