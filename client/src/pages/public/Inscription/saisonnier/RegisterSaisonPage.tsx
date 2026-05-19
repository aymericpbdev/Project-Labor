import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LaborInput } from '../../../../components/ui/Input/input'
import LinkText from '../../../../components/ui/LinkText/LinkText'
import Button from '../../../../components/ui/Button/Button'
import * as authService from '../../../../services/authService'
import './inscriptionSaisonnier.css'


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
  if (value.length > 128) return '128 caractères maximum.'
}

function validateConfirm(value: string, password: string): string | undefined {
  if (!value) return 'Confirmez le mot de passe.'
  if (value !== password) return 'Les mots de passe ne correspondent pas.'
}

function RegisterSaisonPage() {
  const navigate = useNavigate()
  
  const [firstName, setFirstName]             = useState('')
  const [lastName, setLastName]               = useState('')
  const [email, setEmail]                     = useState('')
  const [password, setPassword]               = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
 
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  
  const [isLoading, setIsLoading]   = useState(false)
  const [serverError, setServerError] = useState<string | undefined>()
  
  function validateForm(): boolean {
    const newErrors: Record<string, string | undefined> = {
      firstName:       validateRequired(firstName),
      lastName:        validateRequired(lastName),
      email:           validateEmail(email),
      password:        validatePassword(password),
      confirmPassword: validateConfirm(confirmPassword, password),
    }

    setErrors(newErrors)

    return !Object.values(newErrors).some(Boolean)
  }

  /* Soumission */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError(undefined)

    if (!validateForm()) return

    setIsLoading(true)

    try {
      await authService.register(email, password, firstName, lastName, 'SeasonalWorker')
      navigate('/saison')
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
          <span className="form-card-badge">Saisonnier</span>
          <h1 className="form-card-title">Inscription saisonnier</h1>
          <p className="form-card-subtitle">Créez votre profil et trouvez votre prochaine mission</p>
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
              placeholder="Martin"
              value={lastName}
              error={errors.lastName}
              onChange={e => setLastName(e.target.value)}
              onBlur={() => handleBlur('lastName', () => validateRequired(lastName))}
            />
            <LaborInput
              id="firstName"
              label="Prénom"
              type="text"
              placeholder="Lucie"
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
            placeholder="lucie.martin@exemple.fr"
            value={email}
            error={errors.email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => handleBlur('email', () => validateEmail(email))}
          />
          
          <LaborInput
            id="password"
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            value={password}
            error={errors.password}
            maxLength={128}
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
            maxLength={128}
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

export default RegisterSaisonPage