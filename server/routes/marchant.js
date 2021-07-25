const router = require('express').Router();
const Transaction = require('../models/sequelize/Transaction');
const TransactionMongo = require('../models/mongo/Transaction');
const User = require('../models/sequelize/User');

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
router.get('/transaction', (req, res) => {
    Transaction.findAll()
        .then((data) => { res.send(data); })
        .catch((e) => res.sendStatus(500));
});

// Afficher les transactions du user
// Afficher les opérations d'une transaction 


/**
 * PARTIE OPERATION
 */

// Opération = confirmation de paiement ou remboursement 




module.exports = router;