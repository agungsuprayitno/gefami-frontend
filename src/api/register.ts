
const registerApi = (async (name: string, email: string, password: string) => {
    try {
      const request = {
        name,
        email,
        password
      }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
          method: 'POST',
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;  
      
    } catch (error) {
      console.error('Error save contact:', error);
    }

})
export default registerApi; 