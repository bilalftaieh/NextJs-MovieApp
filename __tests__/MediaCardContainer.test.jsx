import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MediaCardContainer from "@/components/MediaCardContainer";
import { createMediaSlug } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation");
jest.mock("@/lib/utils");

describe("MediaCardContainer", () => {
  const mockMovieObject = {
    results: [
      {
        id: 1,
        poster_path: "/default-image.png",
        title: "Test Movie1",
        release_date: "2023-01-01",
      },
      {
        id: 2,
        poster_path: "/default-image.png",
        name: "Test Movie2",
        first_air_date: "2023-01-01",
      },
      {
        id: 3,
        poster_path: "/default-image.png",
        title: "Test Movie3",
        release_date: "2023-01-01",
      },
    ],
    total_pages: 2,
  };

  const mockTvSerieObject = {
    results: [
      {
        id: 1,
        poster_path: "/default-image.png",
        title: "Test TvSeries1",
        release_date: "2023-01-01",
      },
      {
        id: 2,
        poster_path: "/default-image.png",
        name: "Test TvSeries2",
        first_air_date: "2023-01-01",
      },
    ],
    total_pages: 2,
  };

  beforeEach(() => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(1),
    });
    createMediaSlug.mockReturnValue("mocked value");
  });

  it("renders movie cards correctly", () => {
    const { container } = render(
      <MediaCardContainer mediaObject={mockMovieObject} mediaType="movie" />
    );

    const elements = container.querySelectorAll(".media-card");

    expect(elements.length).toBe(3);
  });

  it("renders tv show cards correctly", () => {
    const { container } = render(
      <MediaCardContainer mediaObject={mockTvSerieObject} mediaType="tv" />
    );

    const elements = container.querySelectorAll(".media-card");

    expect(elements.length).toBe(2);
  });

  it("renders pagination correctly", () => {
    render(
      <MediaCardContainer mediaObject={mockMovieObject} mediaType="movie" />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calculates total pages correctly", () => {
    const mockMediaObject = {
      results: [],
      total_pages: 600,
    };

    render(
      <MediaCardContainer mediaObject={mockMediaObject} mediaType="movie" />
    );

    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("uses total_pages when less than or equal to 500", () => {
    const mockMediaObject = {
      results: [],
      total_pages: 400,
    };

    render(
      <MediaCardContainer mediaObject={mockMediaObject} mediaType="movie" />
    );
    expect(screen.getByText("400")).toBeInTheDocument();
  });
});
