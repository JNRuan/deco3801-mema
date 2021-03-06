const functions = require('firebase-functions')
const admin = require('firebase-admin')

/**
 * API Call to start a mcq challenge for the user. 
 * 
 * @param {Object} Data data object container values to pass to request.
 * @param {Object} Context object for firebase api, primarly for user auth at this stage.
 * @returns Successful response code 200 with Object containing words for the challenge.
 * @throws functions.https.HttpsError internal error if https call failed.
 */
exports.startChallenge = functions.https.onCall(async (data, context) => {
    // Check if the user is logged in or not. 
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A challenge can only be started when logged in.');
    }
    try {
        const user_id = context.auth.uid; // remove the user id when deploying and set properly
    
        // Defines all the parameters required for the randomisation of the quiz
        const max = (await admin.firestore().collection('WordData').doc('count').get()).data().count;
        const count = data.count;
        //words send to the client for the user's challenge randomly chosen
        var challengeWords = []; 

        // Creates a collection of random words and their data which are sent to the user for the challenge
        var randomNums = new Set();
        while(randomNums.size <= count){
            randomNums.add('Word' + Math.floor(Math.random() * max + 1));
        }
        randomNums = Array.from(randomNums); // loads the random documents from the list of all words

        const userData = (await admin.firestore().collection('users').doc(user_id).get()).data();
        const forLang = userData.forLang; 

        var wordRefs = userData.seen[forLang] || [];  // Document references of seen words
        var wordIds = new Set(); // Document id of seen words
        wordRefs.forEach((doc) => {
            wordIds.add(doc.id)
        })

        // Builds a list of words for the user challenge
        for (let i = 0; i < count; i++){
            let word = admin.firestore().collection('WordData').doc(randomNums[i]).get();
            challengeWords.push(word);
        }
        challengeWords = await Promise.all(challengeWords);

        // Adds the appropriate words to the user's seen words
        for (let i = 0; i < count; i++){
            if (!wordIds.has(challengeWords[i].id)){
                wordRefs.push(challengeWords[i].ref);
            }
            challengeWords[i] = challengeWords[i].data();
        }

        // Creates a new challenge instance to save data against
        const newChallenge = await admin.firestore().collection('users').doc(user_id).collection('mcq').add({
            start : admin.firestore.FieldValue.serverTimestamp()
        }); 

        // Updates the user's seen words to include those that are part of the challenge. 
        await admin.firestore().collection('users').doc(user_id).update({['seen.' + forLang]: Array.from(wordRefs)})

        return {status: 'success', code: 201, id: newChallenge.id, words: challengeWords, lang: forLang, message: 
        'Successfully started a new challenge instance!'};
      
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.');
    }
});

/**
 * API Call to register that a challenge has been saved with its score. 
 * 
 * @param {Object} Data data object containing values such as number of correct, incorrect and
 *                  the id of the challenge which is ended. 
 * @param {Object} Context object for firebase api, primarly for user auth at this stage.
 * @returns Successful response code 200. 
 * @throws functions.https.HttpsError internal error if https call failed or incorrect params are passed
 *          in the API call. 
 */
exports.endChallenge = functions.https.onCall(async (data, context) => {
    // Check if the user is logged in or not. 
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A challenge can only be started when logged in.');
    }
    if (!(data.correct && data.incorrect && data.id)) {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid arguments for function call. \
        Ensure the correct, incorrect, id and words are included are arguments');
    }
    try {
        const user_id = context.auth.uid;
        // Ensure the requests adhere to the correct API specification 
       
        // Updates the relevant MCQ challenge with its detaisl
        const res = await admin.firestore().collection('users').doc(user_id).collection('mcq').doc(data.id).update({
            correct: data.correct, 
            incorrect: data.incorrect, 
            score: data.score,
            end: admin.firestore.FieldValue.serverTimestamp()
        })
        return {status: 'success', code: 200, message: 'Successfully saved a challenge instance.'};
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.');
    }
});

/**
 * API Call to get all challenge sessions related to a user.
 * 
 * @param {Object} Optional data object container values to pass to request.
 * @param {Object} Context object for firebase api, primarly for user auth at this stage.
 * @returns Successful response code 200, with Object containing challenge sessions related to user.
 * @throws functions.https.HttpsError internal error if https call failed.
 */
exports.getChallenges = functions.https.onCall(async (data, context) => {
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A challenge can only be started when logged in.');
    }
    try {
        const user_id = context.auth.uid;        
        const result = await admin.firestore().collection('users').doc(user_id).collection('mcq').get(); 
      
        let sessions = [];
        result.forEach(doc => {
            sessions.push(doc.data());
        });
      
        return {status: 'success', code: 200, message: 'Successfully retrieved challenge scores', challenges: sessions};
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.');
    }
});

