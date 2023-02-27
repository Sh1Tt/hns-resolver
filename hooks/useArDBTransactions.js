import { useState, useEffect } from 'react';
import ArDB from 'ardb';
import Arweave from 'arweave';

const useArDBTransactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const arweave = Arweave.init();
        const ardb = new ArDB(arweave);

        const txs = await ardb.search('transactions')
          .tag("Protocol-Name", "AnyoneCanTrain")
          .exclude("anchor")
          .findAll();
          
        const txdata = await Promise.all(txs.map(async (tx,i) => {
          return await fetch(`https://arweave.net/${tx.id}`)
            .then(r => r.text())
            .then(t => {
              return {
                id: tx.id,
                message: t,
                tags: tx.tags
              };
            });
        }));
        
        setTransactions(txdata);
      } 
      catch (err) {
        setError(err);
      };
      
      setLoading(false);
    };

    fetchData();
  }, []);

  return { transactions, isLoading, error };
};

export default useArDBTransactions;