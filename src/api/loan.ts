
const saveLoanApi = (async (bookId: number, userId: number, bookTitle: string) => {
    try {
      const request = {
        book_id: parseInt(bookId),
        user_id: parseInt(userId),
        book_title: bookTitle
      }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pinjam`, {
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
export default saveLoanApi; 