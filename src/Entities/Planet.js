export class Planet {
  constructor(data) {
    this.id = data.id || Math.random().toString(36).substr(2, 9);
    this.name = data.name || '';
    this.tagline = data.tagline || '';
    this.position_x = data.position_x || 0;
    this.position_y = data.position_y || 0;
    this.color = data.color || '#00d9ff';
    this.is_featured = data.is_featured || false;
    this.order = data.order || 0;
  }

  static list(sortBy = 'order') {
    // Mock data for development
    return Promise.resolve([
      new Planet({
        id: '1',
        name: 'Earth',
        tagline: 'Our home planet - explore ocean systems and climate data',
        position_x: 0,
        position_y: 0,
        color: '#00d9ff',
        is_featured: true,
        order: 1
      }),
      new Planet({
        id: '2',
        name: 'Mars',
        tagline: 'The red planet - atmospheric and geological data',
        position_x: 100,
        position_y: 50,
        color: '#ff6b6b',
        is_featured: false,
        order: 2
      }),
      new Planet({
        id: '3',
        name: 'Jupiter',
        tagline: 'Gas giant - storm systems and magnetic field data',
        position_x: -100,
        position_y: 50,
        color: '#ffa726',
        is_featured: false,
        order: 3
      }),
      new Planet({
        id: '4',
        name: 'Saturn',
        tagline: 'Ringed planet - atmospheric composition and rings',
        position_x: 150,
        position_y: -50,
        color: '#ffd54f',
        is_featured: false,
        order: 4
      }),
      new Planet({
        id: '5',
        name: 'Venus',
        tagline: 'Hottest planet - atmospheric pressure and temperature',
        position_x: -150,
        position_y: -50,
        color: '#ff8a65',
        is_featured: false,
        order: 5
      }),
      new Planet({
        id: '6',
        name: 'Neptune',
        tagline: 'Ice giant - wind patterns and atmospheric dynamics',
        position_x: 200,
        position_y: 0,
        color: '#42a5f5',
        is_featured: false,
        order: 6
      })
    ]);
  }
}
