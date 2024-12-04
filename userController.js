const bcrypt = require('bcrypt');

// Inscription
const signup = async (req, res) => {
    const { email, password } = req.body;
    const db = req.db;

    try {
        // Vérifier si l'utilisateur existe déjà
        const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "L'utilisateur existe déjà." });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ajouter l'utilisateur à la base de données
        await db.promise().query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

        res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Connexion
const login = async (req, res) => {
    const { email, password } = req.body;
    const db = req.db;

    try {
        // Vérifier si l'utilisateur existe
        const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: "Identifiants invalides." });
        }

        const user = rows[0];

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Identifiants invalides." });
        }

        res.status(200).json({ message: "Connexion réussie !" });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

module.exports = { signup, login };
