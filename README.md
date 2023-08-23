# Coding Challenge

Hello! Thanks for reading this. My name is Sam Clark, and I've put together this repo for you as the hiring manager. For the react application, I used Vite bundler and SWC(because we all like speed).

This is a fun challenge because typically you're working with the value of a JSON object, but when working with this, you're working with the declarer of the JSON document.

## Requirements

- a computer, this is designed for posix, but windows should work as well with makefile support
- npm

## How to run?

I've went ahead and added a Makefile into the application for your ease of use. It should work in any linux/wsl/osx environment.

- **html challenge** - `make html-challenge`
- **json challenge** - `make json-challenge`

For convenience I also added them to <https://surge.sh> for you:

- [https://heyflow-sam-c.surge.sh](https://heyflow-sam-c.surge.sh) - JSON Challenge
- [https://sincere-land.surge.sh](https://sincere-land.surge.sh) - HTML Challenge

## Challenges

### JSONExplorer

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### CSS/HTML Checkbox Toggle

## Things I Learned

So often time when we are the interviwer, or the interviewee we learn things as we go. This was a really fun challenge.

1. When an array is identified its key is a number, but can a key be anumber?
   a. A key can be a number, but it is identified as a string
   b. A key of an array
2. I first started off with a pretty easy component:

   ```typescript
   export const ShowNiceOutput: React.FC<{
     isValid: boolean;
     stringified: JSONValue;
   }> = ({ isValid, stringified }) => (
     <>
       <div className="text-left">
         {isValid ? (
           <pre>
             <code>{stringified.toString()}</code>
           </pre>
         ) : (
           <></>
         )}
       </div>
     </>
   );
   ```

   - I quickly found out this method was not going to work very well because we needed to handle a lot of parsing

## Things I've Left Open

There are a lot of things to improve on this code. Due to the time constraint of 4 hours I left them out. I kept some of them simple so we can go through them together!

1. Let's find a better naming structure for the components
2. Let's move CSS from inline Tailwind to a css sheet
3. What happens if this gets more complex?
4. Currently we're using a lot of prop drilling...but what if we want to extract the functionality and take a bit more OOP and invert control to the context API?
