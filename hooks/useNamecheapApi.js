import { useState, useEffect } from 'react';
import axios from 'axios';

const useNamecheapApi = (domainName) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [domainData, setDomainData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.namecheap.com/xml.response?ApiUser=${process.env.NAMECHEAP_API_USER}&ApiKey=${process.env.NAMECHEAP_API_KEY}&UserName=${process.env.NAMECHEAP_USERNAME}&Command=namecheap.domains.check&DomainList=${domainName}&ClientIp=213.125.35.42`
        );
        const domainInfo = response.data.CommandResponse.DomainCheckResult;
        if (domainInfo.Available === 'true') {
          setDomainData({
            available: true,
            price: domainInfo.WhoisguardPrice.$,
          });
        } else {
          setDomainData({
            available: false,
            price: null,
          });
        }
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    if (domainName) {
      fetchData();
    }
  }, [domainName]);

  return { isLoading, error, domainData };
};

export default useNamecheapApi;