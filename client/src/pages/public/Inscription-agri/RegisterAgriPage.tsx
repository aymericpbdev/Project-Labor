import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LaborInput } from '../../../components/ui/Input/input'
import  LinkText  from '../../../components/ui/LinkText/LinkText'
import  Button  from '../../../components/ui/Button/Button'
import * as authService from '../../../services/authService'
import './inscription-agri.css'


function validateRequired(value: string): string | undefined {
  if (!value.trim()) return 'Ce champ est requis.'
}

function validateEmail(value: string): string | undefined {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!value.trim()) return 'Ce champ est requis.'
  if (!regex.test(value)) return 'Adresse email invalide.'
}

function validatePassword(value: string): string | undefined {
  if (!value) return '12 caractères minimum.'
  if (value.length < 12) return '12 caractères minimum.'
}

function validateConfirm(value: string, password: string): string | undefined {
  if (!value) return 'Confirmez le mot de passe.'
  if (value !== password) return 'Les mots de passe ne correspondent pas.'
}

function validateSiret(value: string): string | undefined {
  const cleaned = value.replace(/\s/g, '')
  if (!cleaned) return 'Ce champ est requis.'
  if (!/^\d{14}$/.test(cleaned)) return 'Le SIRET doit contenir 14 chiffres.'
}

function RegisterAgriPage() {
  const navigate = useNavigate()
  
  const [firstName, setFirstName]         = useState('')
  const [lastName, setLastName]           = useState('')
  const [email, setEmail]                 = useState('')
  const [exploitation, setExploitation]   = useState('')
  const [siret, setSiret]                 = useState('')
  const [password, setPassword]           = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
    
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | undefined>()
    
  function validateForm(): boolean {
    const newErrors: Record<string, string | undefined> = {
      firstName:       validateRequired(firstName),
      lastName:        validateRequired(lastName),
      email:           validateEmail(email),
      exploitation:    validateRequired(exploitation),
      siret:           validateSiret(siret),
      password:        validatePassword(password),
      confirmPassword: validateConfirm(confirmPassword, password),
    }

    setErrors(newErrors)
        
    return !Object.values(newErrors).some(Boolean)
  }
    
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError(undefined)

    if (!validateForm()) return

    setIsLoading(true)

    try {
      await authService.register(email, password, firstName, lastName, 'farmer')
      navigate('/agri')
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Une erreur est survenue.')
    } finally {
      setIsLoading(false)
    }
  }
    
  function handleBlur(field: string, validatorFn: () => string | undefined) {
    setErrors(prev => ({ ...prev, [field]: validatorFn() }))
  }

  return (
    <div className="page-wrapper">
      <div className="form-card">
        
        <div className="form-card-header">
          <span className="form-card-badge">Agriculteur</span>
          <h1 className="form-card-title">Inscription agriculteur</h1>
          <p className="form-card-subtitle">Créez votre espace et publiez vos annonces</p>
          <div className="form-divider"></div>
        </div>
        
        {serverError && (
          <p className="server-error">{serverError}</p>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
          
          <div className="form-row">
            <LaborInput
              id="lastName"
              label="Nom"
              type="text"
              placeholder="Dupont"
              value={lastName}
              error={errors.lastName}
              onChange={e => setLastName(e.target.value)}
              onBlur={() => handleBlur('lastName', () => validateRequired(lastName))}
            />
            <LaborInput
              id="firstName"
              label="Prénom"
              type="text"
              placeholder="Jean"
              value={firstName}
              error={errors.firstName}
              onChange={e => setFirstName(e.target.value)}
              onBlur={() => handleBlur('firstName', () => validateRequired(firstName))}
            />
          </div>
          
          <LaborInput
            id="email"
            label="Email"
            type="email"
            placeholder="jean.dupont@exemple.fr"
            value={email}
            error={errors.email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => handleBlur('email', () => validateEmail(email))}
          />
          
          <LaborInput
            id="exploitation"
            label="Nom de l'exploitation"
            type="text"
            placeholder="Ferme des Coteaux"
            value={exploitation}
            error={errors.exploitation}
            onChange={e => setExploitation(e.target.value)}
            onBlur={() => handleBlur('exploitation', () => validateRequired(exploitation))}
          />
          
          <LaborInput
            id="siret"
            label="N° SIRET"
            type="text"
            placeholder="123 456 789 00012"
            value={siret}
            error={errors.siret}
            onChange={e => setSiret(e.target.value)}
            onBlur={() => handleBlur('siret', () => validateSiret(siret))}
          />
          
          <LaborInput
            id="password"
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            value={password}
            error={errors.password}
            onChange={e => {
              setPassword(e.target.value)
              if (confirmPassword) {
                setErrors(prev => ({
                  ...prev,
                  password: validatePassword(e.target.value),
                  confirmPassword: validateConfirm(confirmPassword, e.target.value),
                }))
              } else {
                setErrors(prev => ({
                  ...prev,
                  password: validatePassword(e.target.value),
                }))
              }
            }}
          />
          
          <LaborInput
            id="confirmPassword"
            label="Confirmer mot de passe"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            error={errors.confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value)
              setErrors(prev => ({
                ...prev,
                confirmPassword: validateConfirm(e.target.value, password),
              }))
            }}
          />
          
          <Button
            variant="primary"
            size="l"
            type="submit"
            loading={isLoading}
            className="btn--full"
          >
            Créer mon compte
          </Button>

        </form>
                
        <p className="form-footer">
          Déjà un compte ?{' '}
          <LinkText to="/connexion">Se connecter</LinkText>
        </p>

      </div>
    </div>
  )
}

export default RegisterAgriPage