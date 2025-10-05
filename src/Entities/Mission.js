export class Mission {
  constructor(data) {
    this.id = data.id || Math.random().toString(36).substr(2, 9);
    this.name = data.name || '';
    this.organization = data.organization || '';
    this.description = data.description || '';
    this.logo_url = data.logo_url || '';
    this.launch_year = data.launch_year || 0;
    this.status = data.status || 'active';
  }

  static list(sortBy = 'launch_year') {
    // Mock data for development
    return Promise.resolve([
      new Mission({
        id: '1',
        name: 'SWOT',
        organization: 'NASA/JPL',
        description: 'Surface Water and Ocean Topography mission measuring sea surface height',
        logo_url: '',
        launch_year: 2022,
        status: 'active'
      }),
      new Mission({
        id: '2',
        name: 'PACE',
        organization: 'NASA',
        description: 'Plankton, Aerosol, Cloud, ocean Ecosystem mission for ocean color monitoring',
        logo_url: '',
        launch_year: 2024,
        status: 'active'
      }),
      new Mission({
        id: '3',
        name: 'GRACE-FO',
        organization: 'NASA/GFZ',
        description: 'Gravity Recovery and Climate Experiment Follow-On for water mass tracking',
        logo_url: '',
        launch_year: 2018,
        status: 'active'
      })
    ]);
  }
}
