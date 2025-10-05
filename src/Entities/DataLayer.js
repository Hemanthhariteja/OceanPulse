export class DataLayer {
  constructor(data) {
    this.id = data.id || Math.random().toString(36).substr(2, 9);
    this.name = data.name || '';
    this.description = data.description || '';
    this.color_scheme = data.color_scheme || 'cyan';
    this.mission_source = data.mission_source || '';
    this.icon = data.icon || 'default';
    this.data_unit = data.data_unit || '';
    this.order = data.order || 0;
  }

  static list(sortBy = 'order') {
    // Mock data for development
    return Promise.resolve([
      new DataLayer({
        id: '1',
        name: 'Sea Surface Temperature',
        description: 'Global ocean temperature measurements from satellite observations',
        color_scheme: 'thermal',
        mission_source: 'PACE',
        icon: 'temperature',
        data_unit: '°C',
        order: 1
      }),
      new DataLayer({
        id: '2',
        name: 'Phytoplankton Density',
        description: 'Ocean color measurements indicating phytoplankton abundance',
        color_scheme: 'chlorophyll',
        mission_source: 'PACE',
        icon: 'phytoplankton',
        data_unit: 'mg/m³',
        order: 2
      }),
      new DataLayer({
        id: '3',
        name: 'Sea Level Anomaly',
        description: 'Sea surface height variations from radar altimetry',
        color_scheme: 'topographic',
        mission_source: 'SWOT',
        icon: 'sealevel',
        data_unit: 'mm',
        order: 3
      })
    ]);
  }
}
