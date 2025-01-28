'use client'
import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
const AuthContext = createContext([]);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token') || null;
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);


    // Handle Login Get Data
    const fetchData = useCallback(async () => {
        // fetch User data
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SOME_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, []);


    // Handle Fetch User Data
    useEffect(() => {
        fetchData()
    }, [token])




    return (
        <AuthContext.Provider value={{ user, loading, users, fetchData }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => useContext(AuthContext);