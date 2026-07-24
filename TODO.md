# Export to xlsx - Fix Plan ✅

- [x] Analyze codebase
- [x] Get user approval on plan
- [x] **Step 1**: Rewrite `Table.tsx` - Replace `xlsx` + `file-saver` with `exceljs`, add Polish column headers
- [x] **Step 2**: Update `package.json` - Remove unused `file-saver` and `@types/file-saver`
- [x] **Step 3**: Run `npm install` to remove unused packages (26 packages removed)
- [x] **Step 4**: Build and verify (TypeScript compiles without errors)
