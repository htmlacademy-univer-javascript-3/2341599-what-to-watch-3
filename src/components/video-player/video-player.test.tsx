import { fireEvent, render, screen } from '@testing-library/react';
import VideoPlayer from './video-player';

describe('VideoPlayer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly', () => {
    render(<VideoPlayer poster="" videoSrc="" isActive />);

    expect(screen.getByTestId('videoPlayer')).toBeInTheDocument();
  });

  it('starts playing after 1 second', () => {
    HTMLVideoElement.prototype.play = vi.fn();
    render(<VideoPlayer poster="" videoSrc="" isActive />);
    fireEvent(screen.getByTestId('videoPlayer'), new Event('loadeddata'));
    vi.runAllTimers();

    expect(screen.getByTestId<HTMLVideoElement>('videoPlayer').play).toBeCalledTimes(
      1
    );
  });
});
