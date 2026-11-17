export const signUpContent = {
  title: 'Créer un compte',
  fields: {
    firstName: { label: 'Prénom*' },
    email: { label: 'Email*', placeholder: 'jean.dev@gmail.com' },
    password: { label: 'Mot de passe*' },
  },
  firstNameError: 'Le prénom est requis',
  emailError: "Le format de l'email est invalide",
  passwordError: 'Le mot de passe doit contenir au moins 8 caractères.',
  submit: 'Créer un compte',
  pendingLabel: 'Création du compte en cours',
  footerText: 'Tu as déjà un compte ? ',
  footerLink: 'Connecte-toi.',
  navBarAction: 'Se connecter',
}
