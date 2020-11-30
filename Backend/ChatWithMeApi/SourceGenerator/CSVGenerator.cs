using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Text;
using NotVisualBasic.FileIO;

namespace CsvGenerator
{
    [Generator]
    public class CSVGenerator : ISourceGenerator
    {
        public enum CsvLoadType
        {
            Startup,
            OnDemand
        }
        public static string GetCsvFieldType(string exemplar) => exemplar switch
        {
            _ when bool.TryParse(exemplar, out _) => "bool",
            _ when int.TryParse(exemplar, out _) => "int",
            _ when double.TryParse(exemplar, out _) => "double",
            _ => "string"
        };
        public static (string[], string[], string[]?) ExtractProperties(CsvTextFieldParser parser)
        {
            string[]? headerFields = parser.ReadFields();
            if (headerFields == null) throw new Exception("Empty csv file!");

            string[]? firstLineFields = parser.ReadFields();
            if (firstLineFields == null)
            {
                return (Enumerable.Repeat("string", headerFields.Length).ToArray(), headerFields, firstLineFields);
            }
            else
            {
                return (firstLineFields.Select(GetCsvFieldType).ToArray(), headerFields.Select(StringToValidPropertyName).ToArray(), firstLineFields);
            }
        }
        public static string GenerateClassFile(string className, string csvText, CsvLoadType loadTime, bool cacheObjects)
        {
            StringBuilder sb = new StringBuilder();
            using CsvTextFieldParser parser = new CsvTextFieldParser(new StringReader(csvText));

            //// Usings
            sb.Append(@"
#nullable enable
namespace CSV {
    using System.Collections.Generic;
");
            //// Class Definition
            sb.Append($"    public class {className} {{\n");


            if (loadTime == CsvLoadType.OnDemand)
            {
                sb.Append(@$"
        static {className}() {{ var x = All; }}
");
            }
            (string[] types, string[] names, string[]? fields) = ExtractProperties(parser);
            int minLen = Math.Min(types.Length, names.Length);

            for (int i = 0; i < minLen; i++)
            {
                sb.AppendLine($"        public {types[i]} {StringToValidPropertyName(names[i])} {{ get; set;}} = default!;");
            }
            sb.Append("\n");

            sb.AppendLine($"        static IEnumerable<{className}>? _all = null;");
            sb.Append($@"
        public static IEnumerable<{className}> All {{
            get {{");

            if (cacheObjects) sb.Append(@"
                if(_all != null)
                    return _all;
");
            sb.Append(@$"
                List<{className}> l = new List<{className}>();
                {className} c;
");
            do
            {
                if (fields == null) continue;
                if (fields.Length < minLen) throw new Exception("Not enough fields in CSV file.");

                sb.AppendLine($"                c = new {className}();");
                string value = "";
                for (int i = 0; i < minLen; i++)
                {
                    value = GetCsvFieldType(fields[i]) == "string" ? $"\"{fields[i].Trim().Trim(new char[] { '"' })}\"" : fields[i];
                    sb.AppendLine($"                c.{names[i]} = {value};");
                }
                sb.AppendLine("                l.Add(c);");

                fields = parser.ReadFields();
            } while (!(fields == null));

            sb.AppendLine("                _all = l;");
            sb.AppendLine("                return l;");
            sb.Append("            }\n        }\n    }\n}\n");
            return sb.ToString();

        }
        static string StringToValidPropertyName(string s)
        {
            s = s.Trim();
            s = char.IsLetter(s[0]) ? char.ToUpper(s[0]) + s.Substring(1) : s;
            s = char.IsDigit(s.Trim()[0]) ? "_" + s : s;
            s = new string(s.Select(ch => char.IsDigit(ch) || char.IsLetter(ch) ? ch : '_').ToArray());
            return s;
        }
        static IEnumerable<(string, string)> SourceFilesFromAdditionalFile(CsvLoadType loadTime, bool cacheObjects, AdditionalText file)
        {
            string className = Path.GetFileNameWithoutExtension(file.Path);
            string csvText = file.GetText()!.ToString();
            return new (string, string)[] { (className, GenerateClassFile(className, csvText, loadTime, cacheObjects)) };
        }
        static IEnumerable<(string, string)> SourceFilesFromAdditionalFiles(IEnumerable<(CsvLoadType loadTime, bool cacheObjects, AdditionalText file)> pathsData)
            => pathsData.SelectMany(d => SourceFilesFromAdditionalFile(d.loadTime, d.cacheObjects, d.file));
        static IEnumerable<(CsvLoadType, bool, AdditionalText)> GetLoadOptions(GeneratorExecutionContext context)
        {
            foreach (AdditionalText file in context.AdditionalFiles)
            {
                if (Path.GetExtension(file.Path).Equals(".csv", StringComparison.OrdinalIgnoreCase))
                {
                    // are there any options for it?
                    context.AnalyzerConfigOptions.GetOptions(file).TryGetValue("build_metadata.additionalfiles.CsvLoadType", out string? loadTimeString);
                    Enum.TryParse(loadTimeString, ignoreCase: true, out CsvLoadType loadType);

                    context.AnalyzerConfigOptions.GetOptions(file).TryGetValue("build_metadata.additionalfiles.CacheObjects", out string? cacheObjectsString);
                    bool.TryParse(cacheObjectsString, out bool cacheObjects);

                    yield return (loadType, cacheObjects, file);
                }
            }
        }
        public void Execute(GeneratorExecutionContext context)
        {
            IEnumerable<(CsvLoadType, bool, AdditionalText)> options = GetLoadOptions(context);
            IEnumerable<(string, string)> nameCodeSequence = SourceFilesFromAdditionalFiles(options);
            foreach ((string name, string code) in nameCodeSequence)
                context.AddSource($"Csv_{name}", SourceText.From(code, Encoding.UTF8));
        }
        public void Initialize(GeneratorInitializationContext context)
        {
        }
    }
}
