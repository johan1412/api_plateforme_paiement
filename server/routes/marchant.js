const router = require('express').Router();
const { Transaction } = require('../models/sequelize');
const verify = require('../lib/security');

/**
 * Le marchand doit pouvoir :
- Créer une transaction
- Lister ses transactions
- Afficher une transaction
- Lister les opérations d’une transaction
- Afficher une opération
- Créer des opérations de remboursement (partiel ou intégral)
 */



/**
 * GESTION PROFIL
 */

// UPDATE AND DELETE

/**
 * CRUD TRANSACTION
 */

// Créer une transaction
router.get('/transaction', verify, async (req, res) => {
    const transactions = await Transaction.findAll();
    res.send(transactions);
});

// Afficher les transactions du user
// Afficher les opérations d'une transaction 


/**
 * PARTIE OPERATION
 */

// Opération = confirmation de paiement ou remboursement 




module.exports = router;