import githublogo from '../assets/images/github.svg';

export const Footer = () => {
  return (
    <footer className="bg-slate-500 text-white pt-4 pb-4">
      <div className="flex justify-between mx-24">
        <div>Copyright © 2023. All rights reserved.</div>
        <div className="flex w-52 justify-between">
          <div>
            By
            <a className="pl-3 text-white underline" href="https://www.google.com">
              SAURIN THAKKAR
            </a>
            .
          </div>
          <div className="w-5 h-5 pt-1 pl-1">
            <a href="https://www.google.com">
              <img src={githublogo} alt="github logo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
