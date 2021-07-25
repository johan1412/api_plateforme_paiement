const router = require('express').Router();
const Transaction = require('../models/sequelize/Transaction');
const TransactionMongo = require('../models/mongo/Transaction');
const User = require('../models/sequelize/User');
const ShippingAddress = require('../models/sequelize/ShippingAddress');
const Cart = require('../models/sequelize/Cart');


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
router.post('/transaction/new', (req, res) => {
    const transaction = new Transaction(
        req.body,
        {
            include: [
                {
                    association: Transaction.ShippingAddress,
                },
                {
                    association: Transaction.BillingAddress
                },
                {
                    association: Transaction.Cart,
                    include: [ Cart.Products ]
                },

            ]
        }
    );
    const savedTransaction = transaction.save();
    console.log(savedTransaction)
    res.send(savedTransaction);
});



// Afficher les transactions du user
// Afficher les opérations d'une transaction 


/**
 * PARTIE OPERATION
 */

// Opération = confirmation de paiement ou remboursement 




module.exports = router;