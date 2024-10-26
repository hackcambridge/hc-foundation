export const loginMethods = {
  credentials: 0,
  Google: 1,
  GitHub: 2,
  LinkedIn: 3,
};

export async function validateToken({ Role, token }) {
  const role = await Role.findOne({ token });

  return !!role;
}
