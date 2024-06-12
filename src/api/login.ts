const loginApi = (async (email: string, password: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });
        if (response.status == 401 || response.status == 404) {
          throw new Error('Invalid Username and Password');
        } else {
          const data = await response.json();
          const token = data.data.access_token
          return token; 
        }
      } catch (error:any) {
        const err = {
          status: 401,
          message: "Invalid Username Or Password"
        }
        return err
      }

})
export default loginApi; 