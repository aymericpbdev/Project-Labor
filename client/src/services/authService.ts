import type { User} from '../types/user'

const TOKEN_KEY = 'labor_token'

interface LoginResponse {
    success: boolean
    token: string
    user: User
    message?: string
}

interface AuthResponse {
    success: boolean
    user: User
}


export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
}

function saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
}

function removeToken(): void {
    localStorage.removeItem(TOKEN_KEY)
}

export function logout(): void {
    removeToken()
}

// AUTH //
export async function login(email: string, password: string): Promise<User> {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    const data = await response.json() as LoginResponse

    if (!response.ok || !data.success) {
        throw new Error(data.message ?? 'Identifiants invalides')
    }

    saveToken(data.token)
    return data.user
}

export async function register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
): Promise<User> {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName, role }),
    })

    const data = await response.json() as LoginResponse

    if (!response.ok || !data.success) {
        throw new Error(data.message ?? 'Erreur lors de l\'inscription')
    }

    saveToken(data.token)
    return data.user
}

export async function forgotPassword(email: string): Promise<void> {
    const response = await fetch('/api/auth/forgot-password' , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    })

    if (!response.ok) {
        const data = await response.json()
       throw new Error(data.message ?? 'Erreur lors de la demande de réinitialisation du mot de passe')
  }
}

export async function resetPassword(
    token: string,
    newPassword: string
): Promise<void> {
    const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message ?? 'Erreur lors de la réinitialisation du mot de passe')
    }
}

// Vérifie le token au démarage //
export async function fetchCurrentUser(): Promise<User | null>
{
    const token = getToken()
    if (!token) return null
    

    const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
    })

    

    if (!response.ok) {
        removeToken()
        return null
    }

    const data = await response.json() as AuthResponse
    return data.user
}
