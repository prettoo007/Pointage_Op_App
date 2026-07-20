# Carnet de pointage — installation

Ton app d'horaire, accessible depuis PC, tablette et smartphone, avec tes données
synchronisées automatiquement via un dépôt GitHub privé.

Trois étapes : **1) créer le dépôt**, **2) créer le jeton d'accès**, **3) activer GitHub Pages**.
Une fois fait, tu n'y reviens plus — sauf si tu changes d'appareil.

---

## 1. Créer le dépôt GitHub

1. Va sur [github.com/new](https://github.com/new).
2. Nom du dépôt : ce que tu veux, par exemple `horaire-prive`.
3. Visibilité : choisis **Private** (tes données d'horaire ne doivent pas être publiques).
4. Ne coche aucune case d'initialisation (pas de README, pas de .gitignore) — laisse tout vide.
5. Clique **Create repository**.

Tu arrives sur une page "Quick setup" avec des commandes `git` — ignore-les, on va plutôt
**glisser-déposer les fichiers directement dans l'interface web** (pas besoin d'installer Git) :

1. Sur la page du dépôt vide, clique **uploading an existing file** (lien dans le message d'accueil).
2. Glisse-dépose **tout le contenu** de ce dossier (`index.html`, `manifest.json`, `sw.js`, et le
   dossier `icons` avec les 3 images dedans).
3. En bas de page, message de commit : "Premier envoi" (ou ce que tu veux) → **Commit changes**.

À la fin, la racine de ton dépôt doit contenir :
```
index.html
manifest.json
sw.js
icons/
  icon.svg
  icon-192.png
  icon-512.png
  icon-maskable.svg
  icon-maskable-512.png
```

---

## 2. Créer le jeton d'accès personnel (Personal Access Token)

Ce jeton permet à l'app, depuis ton navigateur, d'écrire tes données dans **ce dépôt uniquement**
(pas accès au reste de ton compte GitHub).

1. Va sur [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new).
2. **Token name** : `horaire-app` (ou ce que tu veux).
3. **Expiration** : choisis ce qui te convient (ex. 1 an — tu pourras en recréer un après).
4. **Repository access** → **Only select repositories** → sélectionne ton dépôt `horaire-prive`.
5. **Permissions** → **Repository permissions** → trouve **Contents** → mets-le sur **Read and write**.
   (Laisse tout le reste sur "No access".)
6. En bas de page → **Generate token**.
7. GitHub affiche le jeton **une seule fois** (il commence par `github_pat_...`) : copie-le
   immédiatement dans un endroit sûr (gestionnaire de mots de passe). Tu en auras besoin à
   l'étape 4, sur **chaque appareil**.

---

## 3. Activer GitHub Pages

1. Dans ton dépôt, va dans **Settings** (onglet en haut) → **Pages** (menu de gauche).
2. **Source** : `Deploy from a branch`.
3. **Branch** : `main`, dossier `/ (root)` → **Save**.
4. Attends 1-2 minutes, puis rafraîchis la page : une bannière verte affiche l'adresse de ton site,
   du type :
   ```
   https://TON-NOM-UTILISATEUR.github.io/horaire-prive/
   ```

---

## 4. Se connecter depuis chaque appareil

1. Ouvre l'adresse de l'étape 3 dans le navigateur de ton PC, ta tablette ou ton smartphone.
2. L'app demande : **nom d'utilisateur GitHub**, **nom du dépôt**, **jeton d'accès personnel**.
   Renseigne les trois (le jeton copié à l'étape 2).
3. Clique **Se connecter**. Tes données se chargent (ou se créent, la première fois).

**Installer l'app comme une vraie application** (icône sur l'écran d'accueil, plein écran, sans
barre d'adresse) :
- **iPhone/iPad (Safari)** : bouton Partager → *Sur l'écran d'accueil*.
- **Android (Chrome)** : menu ⋮ → *Installer l'application* (ou *Ajouter à l'écran d'accueil*).
- **PC (Chrome/Edge)** : icône d'installation dans la barre d'adresse (à droite), ou menu → *Installer Carnet de pointage*.

Répète cette étape 4 sur chaque appareil (le jeton doit être saisi une fois par appareil — c'est
normal, il n'est jamais stocké ailleurs que dans ton navigateur local).

---

## Bon à savoir

- **Sécurité du jeton** : il est stocké uniquement dans le navigateur de chaque appareil (jamais
  envoyé ailleurs qu'à GitHub). Il ne donne accès qu'au seul dépôt choisi. Si tu perds un appareil
  ou veux couper l'accès, [révoque le jeton ici](https://github.com/settings/tokens) puis
  regénères-en un nouveau.
- **Changer de dépôt ou de jeton** : dans l'app, ⚙ Réglages → *Changer de dépôt / déconnecter cet
  appareil*.
- **Historique des données** : comme tout est stocké dans un fichier Git, tu as un historique
  complet des modifications consultable dans l'onglet **Commits** du dépôt — pratique en cas
  d'erreur d'encodage.
- **Hors ligne** : l'app s'ouvre même sans connexion (grâce au service worker), mais les
  modifications ne se synchronisent qu'au retour du réseau — un badge en haut à droite indique
  l'état (Synchronisé / Enregistrement… / Hors ligne).
