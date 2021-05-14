const getWorldwide = async () => {
    try {
      let response = await fetch(
        'https://disease.sh/v3/covid-19/all'
      );
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };