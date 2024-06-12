import getCookie from "@/helper/getCookie";

const getUsersApi = (async () => {
  const authToken = getCookie('auth_token')
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data;  
      
      } catch (error) {
        console.error('Error fetching users:', error);
      }

})
export default getUsersApi; 