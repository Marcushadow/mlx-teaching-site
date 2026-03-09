import { useRef, useEffect, useCallback } from 'react'
import Editor, { type OnMount } from '@monaco-editor/react'
import type * as Monaco from 'monaco-editor'

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  highlightLine?: number
  errors?: { line: number; message: string }[]
  readOnly?: boolean
}

export function CodeEditor({ code, onChange, highlightLine, errors, readOnly }: CodeEditorProps) {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<typeof Monaco | null>(null)
  const decorationsRef = useRef<Monaco.editor.IEditorDecorationsCollection | null>(null)

  const handleMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco
    decorationsRef.current = editor.createDecorationsCollection([])
  }, [])

  // Update line highlight decorations when highlightLine changes
  useEffect(() => {
    const editor = editorRef.current
    if (!editor || !decorationsRef.current) return

    if (highlightLine != null && highlightLine > 0) {
      decorationsRef.current.set([
        {
          range: {
            startLineNumber: highlightLine,
            startColumn: 1,
            endLineNumber: highlightLine,
            endColumn: 1,
          },
          options: {
            isWholeLine: true,
            className: 'highlighted-line',
            inlineClassName: undefined,
          },
        },
      ])
    } else {
      decorationsRef.current.set([])
    }
  }, [highlightLine])

  // Update error markers when errors change
  useEffect(() => {
    const editor = editorRef.current
    const monaco = monacoRef.current
    if (!editor || !monaco) return

    const model = editor.getModel()
    if (!model) return

    const markers: Monaco.editor.IMarkerData[] = (errors ?? []).map((err) => ({
      severity: monaco.MarkerSeverity.Error,
      message: err.message,
      startLineNumber: err.line,
      startColumn: 1,
      endLineNumber: err.line,
      endColumn: model.getLineMaxColumn(err.line) || 1,
    }))

    monaco.editor.setModelMarkers(model, 'mlx-parser', markers)
  }, [errors])

  return (
    <Editor
      height="100%"
      defaultLanguage="python"
      theme="vs-dark"
      value={code}
      onChange={(value) => onChange(value ?? '')}
      onMount={handleMount}
      options={{
        minimap: { enabled: false },
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        fontSize: 14,
        readOnly: readOnly ?? false,
        automaticLayout: true,
        padding: { top: 12 },
      }}
    />
  )
}
