
# CabMed - Plateforme de Gestion de Cabinet Médical

## Introduction
CabMed est une plateforme complète de gestion de cabinet médical conçue pour faciliter la gestion quotidienne des rendez-vous, des patients, des paiements et des dossiers médicaux. Cette application est destinée à être utilisée par trois types d'utilisateurs : l'administrateur, le médecin, et le secrétaire médical.

## Comptes Utilisateurs
1. **Admin:**
   - Gère les comptes utilisateurs et les autorisations d'accès.
   - Surveille l'activité globale de la plateforme.
   - Accès aux fonctionnalités administratives avancées.

2. **Médecin:**
   - Consulte le calendrier des rendez-vous.
   - Accède aux dossiers médicaux des patients.
   - Génère des certificats, ordonnances et rapports de consultation.

3. **Secrétaire Médical:**
   - Planifie les rendez-vous pour les patients.
   - Gère les listes d'attente et les disponibilités des médecins.
   - Gère les informations administratives des patients.

## Technologies Utilisées
- **Frontend: ReactJS**
  - Interface utilisateur réactive et conviviale.
  - Gestion dynamique des données pour une expérience utilisateur fluide.

- **Backend: ExpressJS (Node.js)**
  - Gestion robuste des requêtes HTTP.
  - Communication efficace avec la base de données.

- **ORM: Sequelize**
  - Abstraction de la base de données relationnelle.
  - Facilité d'utilisation pour les opérations CRUD (Create, Read, Update, Delete).

## Fonctionnalités Principales
1. **Gestion des Rendez-vous:**
   - Planification intuitive des rendez-vous pour les médecins.
   - Affichage clair des créneaux horaires disponibles.

2. **Gestion des Patients:**
   - Création et mise à jour des dossiers médicaux des patients.
   - Suivi des antécédents médicaux et des informations administratives.

3. **Gestion des Paiements:**
   - Enregistrement des paiements des patients pour les consultations et les services médicaux.

4. **Certificats et Ordonnances:**
   - Génération et gestion des certificats médicaux et des ordonnances.

5. **Liste d'Attente:**
   - Organisation efficace des patients en attente de rendez-vous.

## Comment Utiliser l'Application
1. Clonez le dépôt sur votre machine locale.
   ```bash
   git clone https://github.com/ahmedaboutaib/cabmed.git
   ```

2. Installez les dépendances du frontend et du backend.
   ```bash
   cd cabmed/frontend
   npm install

   cd ../backend
   npm install
   ```

3. Configurez la base de données dans le fichier `config/database.js` en utilisant Sequelize.

4. Lancez l'application.
   ```bash
   cd ../frontend
   npm run dev

   cd ../backend
    npm run watch
   ```

5. Accédez à l'application dans votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000).

## Contributions
Les contributions à l'amélioration de CabMed sont les bienvenues. Créez une issue pour discuter des nouvelles fonctionnalités ou des corrections de bugs, et soumettez des pull requests conformes aux directives du projet.

Nous espérons que CabMed facilite la gestion de votre cabinet médical et améliore l'efficacité de votre pratique médicale.




