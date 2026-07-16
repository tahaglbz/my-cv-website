import GithubRepos from "@/components/GithubRepos";

export const metadata = {
  title: "Projects | Taha Gülbaz",
  description:
    "Open source projects and GitHub repositories by Taha Gülbaz.",
};

const ProjectsPage = () => {
  return (
    <main className="min-h-screen">
      <GithubRepos username="tahaglbz" />
    </main>
  );
};

export default ProjectsPage;
