export class AudioChapter {
  constructor(data) {
    this.id = data.id || Math.random().toString(36).substr(2, 9);
    this.title = data.title || '';
    this.start_time = data.start_time || 0;
    this.end_time = data.end_time || 0;
    this.text_content = data.text_content || '';
    this.visual_cue = data.visual_cue || '';
    this.highlight_terms = data.highlight_terms || [];
    this.order = data.order || 0;
  }

  static list(sortBy = 'order') {
    // Mock data for development
    return Promise.resolve([
      new AudioChapter({
        id: '1',
        title: 'Introduction to Ocean Systems',
        start_time: 0,
        end_time: 45,
        text_content: 'Welcome to Ocean Pulse, where we explore Earth\'s interconnected ocean systems through NASA\'s most advanced satellite missions. Our planet\'s oceans are not just vast bodies of water—they are dynamic systems that regulate climate, support life, and connect every corner of our world.',
        visual_cue: 'temperature',
        highlight_terms: ['ocean systems', 'NASA', 'satellite missions', 'climate'],
        order: 1
      }),
      new AudioChapter({
        id: '2',
        title: 'Sea Surface Temperature Patterns',
        start_time: 45,
        end_time: 90,
        text_content: 'Sea surface temperature measurements reveal the complex patterns of ocean currents and heat distribution. These temperature variations drive weather systems, influence marine ecosystems, and provide crucial data for understanding climate change impacts on our oceans.',
        visual_cue: 'temperature',
        highlight_terms: ['temperature', 'ocean currents', 'climate change', 'marine ecosystems'],
        order: 2
      }),
      new AudioChapter({
        id: '3',
        title: 'Phytoplankton and Ocean Health',
        start_time: 90,
        end_time: 135,
        text_content: 'Phytoplankton, the microscopic plants of the ocean, are fundamental to marine food webs and global carbon cycles. Through advanced ocean color measurements, we can track phytoplankton abundance and distribution, providing insights into ocean health and productivity.',
        visual_cue: 'phytoplankton',
        highlight_terms: ['phytoplankton', 'marine food webs', 'carbon cycles', 'ocean health'],
        order: 3
      }),
      new AudioChapter({
        id: '4',
        title: 'Sea Level Rise and Global Impact',
        start_time: 135,
        end_time: 180,
        text_content: 'Sea level rise is one of the most visible consequences of climate change. Through precise radar altimetry measurements, we can track sea level variations with centimeter accuracy, helping us understand the complex interactions between ice loss, ocean expansion, and coastal impacts.',
        visual_cue: 'sealevel',
        highlight_terms: ['sea level rise', 'climate change', 'ice loss', 'coastal impacts'],
        order: 4
      })
    ]);
  }
}
