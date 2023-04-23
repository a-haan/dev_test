const fetchNasaData = async (planet: string, date: string, radius: number) => {
  try {
    // replace spaces with _ for the API
    const fixPlanet = planet.replace(/ /g, '_');
    const res = await fetch(
      // one result only
      `https://exoplanets.nasa.gov/api/v1/planets/?condition_1=${fixPlanet}:pl_hostname`,
    );
    const data = await res.json();
    if (data.items?.length === 0) {
      // no results
      return 'No results';
    }
    const nasaData = data.items[0];

    const { display_name, description, mass_display, subtitle, planet_type, pl_discmethod, id, pl_facility } = nasaData;

    const dateName = nasaData.display_name + '-' + date;
    const slug = dateName
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    return {
      id,
      title: display_name,
      subtitle,
      description: description,
      date,
      radius,
      mass: mass_display,
      slug,
      image: `https://exoplanets.nasa.gov${nasaData.image}`,
      planet_type,
      pl_discmethod,
      pl_facility,
    };
  } catch (error) {
    console.log(error);
  }
};

export default fetchNasaData;
