from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_text_splitters import Language

# Sample Python code with array problems as a string variable
python_code = """
def two_sum(nums, target):
    '''Find two numbers that add up to target'''
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

def find_maximum(arr):
    '''Find maximum element in array'''
    if not arr:
        return None
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val

def reverse_array(arr):
    '''Reverse array in place'''
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr

def remove_duplicates(nums):
    '''Remove duplicates from sorted array'''
    if not nums:
        return 0
    write_index = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            nums[write_index] = nums[i]
            write_index += 1
    return write_index

# Test cases
if __name__ == '__main__':
    print(two_sum([2, 7, 11, 15], 9))
    print(find_maximum([1, 5, 3, 9, 2]))
    print(reverse_array([1, 2, 3, 4, 5]))
"""

splitter = RecursiveCharacterTextSplitter.from_language(
    language=Language.PYTHON,
    chunk_size=100,
    chunk_overlap=20,
    length_function=len,
)

# Split the Python code
chunks = splitter.split_text(python_code)
print(f"Number of chunks: {len(chunks)}")
for i, chunk in enumerate(chunks):
    print(f"\n--- Chunk {i+1} ---")
    print(chunk)




