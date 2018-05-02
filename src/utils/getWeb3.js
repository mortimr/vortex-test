import Web3 from 'web3'

let getWeb3 = new Promise(function(resolve, reject) {
  window.addEventListener('load', function() {
    let web3 = window.web3;
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
      console.log('Injected web3 detected.');
      resolve(web3)
    } else {
      console.warn('Unable to load Web3');
      reject(new Error("Unable to load Web3"));
    }
  })
});

export default getWeb3
