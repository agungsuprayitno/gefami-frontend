'use client'
import saveLoanApi from "@/api/loan";
import getUsersApi from "@/api/users";
import { useEffect, useState } from "react";
export default function Movie() {

    const books = [
        { id: 1, title: "To Kill a Mockingbird" },
        { id: 2, title: "1984" },
        { id: 3, title: "Pride and Prejudice" },
        { id: 4, title: "The Great Gatsby" },
        { id: 5, title: "Moby Dick" },
        { id: 6, title: "War and Peace" },
        { id: 7, title: "The Catcher in the Rye" },
        { id: 8, title: "The Hobbit" },
        { id: 9, title: "Crime and Punishment" },
        { id: 10, title: "The Odyssey" }
    ]

    const [formState, setFormState] = useState({
        book_id: 0,
        user_id: 0,
        book_title: '',
      });

    const [users, setUsers] = useState(null);
    const [bookTitle, setBookTitle] = useState('');

    useEffect(() => {
        const fetchUsers = async() => {
            const usersFetched = await getUsersApi();
            setUsers(usersFetched);
        } 
        fetchUsers()

        if(formState.book_id !== 0){
            const bookSelected = books.find((book) => {
                return book.id === formState.book_id;
            });
            // setFormState({
            //     ...formState,
            //     ['book_title']: bookSelected?.title ?? '',
            // });    
        }

    },[])
    
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });        
    };

   const saveLoan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newContact = saveLoanApi(formState.book_id,formState.user_id,formState.book_title)
        // alert(" Thank you for contacting us! We will be in touch shortly.")
    }
    return (
        <>
            <section className="max-w-5xl mx-auto py-12 px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-1">
                        <h2 className="text-2xl font-bold mb-4">Pinjam Buku</h2>
                        <form className="space-y-4" onSubmit={saveLoan}>
                            <div>
                                <label htmlFor="name" className="block text-lg font-medium text-gray-800">User</label>
                                <select
                                    name="user_id"
                                    className="w-full col-span-12 border-2 border-teal-600 px-3 py-2 mb-2 rounded focus:outline-0 bg-transparent"
                                    value={formState.user_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select a User</option>

                                    {users ? (
                                         users.map((user: any) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                   
                                </select>
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-lg font-medium text-gray-800">Book</label>
                                <select
                                    name="book_id"
                                    className="w-full col-span-12 border-2 border-teal-600 px-3 py-2 mb-2 rounded focus:outline-0 bg-transparent"
                                    value={formState.book_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select a book</option>
                                    {books.map((book) => (
                                        <option key={book.id} value={book.id}>
                                            {book.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                       
                            <button 
                                type="submit" 
                                className="bg-teal-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-teal-600 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
 
