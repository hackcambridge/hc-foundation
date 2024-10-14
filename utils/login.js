export const loginMethods = {
  credentials: 0,
  Google: 1,
  GitHub: 2,
  LinkedIn: 3,
};

export async function validateToken({ Admin, token }) {
  const admin = await Admin.findOne({ token });

  return !!admin;
}
