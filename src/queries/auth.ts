import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { USER_QUERY } from "."
import { fetchAuthorization, fetchLogin } from "../services/auth"
import { ILoginer } from "../types/user.type"

export const useLogin = (loginer: ILoginer) => useQuery({
	queryKey: [USER_QUERY, loginer],
	queryFn: () => fetchLogin(loginer).then((res) => res.data.result),
	enabled: false
})

export const userLogin = useMutation({
		mutationFn: (loginer: ILoginer) => fetchLogin(loginer),
	})