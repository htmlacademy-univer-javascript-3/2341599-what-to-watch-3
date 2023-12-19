import { render, screen } from '@testing-library/react';
import VideoPlayer from './video-player';

describe('VideoPlayer', () => {
  it('renders correctly', () => {
    render(<VideoPlayer poster="" videoSrc="" isActive />);

    expect(screen.getByTestId('videoPlayer')).toBeInTheDocument();
  });
});
